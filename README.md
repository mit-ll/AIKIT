# AIKIT
**Artificial Intelligence Tools for Knowledge-Intensive Tasks (AIKIT)**

################################################################################
Author:		Darrell O. Ricke, Ph.D. (mailto: Darrell.Ricke@ll.mit.edu)
Copyright:	Copyright (c) 2024 Massachusetts Institute of Technology
License:	GNU GPL license (http://www.gnu.org/licenses/gpl.html)

RAMS request ID  1028310

DISTRIBUTION STATEMENT A. Approved for public release. Distribution is unlimited.
This material is based upon work supported by the Department of the Air Force 
under Air Force Contract No. FA8702-15-D-0001. Any opinions, findings, 
conclusions or recommendations expressed in this material are those of the 
author(s) and do not necessarily reflect the views of the Department of the 
Air Force.

© 2024 Massachusetts Institute of Technology.

Subject to FAR52.227-11 Patent Rights - Ownership by the contractor (May 2014)

The software/firmware is provided to you on an As-ls basis
Delivered to the U.S. Government with Unlimited Rights, as defined in 
DFARS Part 252.227-7013 or 7014 (Feb 2014). Notwithstanding any copyright 
notice, U.S. Government rights in this work are defined by DFARS 252.227-7013 
or DFARS 252.227-7014 as detailed above. Use of this work other than as 
specifically authorized by the U.S. Government may violate any copyrights that 
exist in this work.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
################################################################################

**Summary**

  This is the Artificial Intelligence Tools for Knoledge-Intensive Tasks (AIKIT)
system.  AIKIT is packaged as both Docker and Singularity containers.  AIKIT 
includes Large Language Models (LLM), LangChain, Jupyter notebooks, 
Retrieval-Augmented Generation (RAG), and Ruby-on-Rails web interface.

**Singularity**

**To build:**

  Update the AIKIT_UI/Gemfile for the 3.0.2 version of Ruby by commenting out the Docker version and uncommenting the 3.0.2 version.

  tar -cf AIKIT_UI.tar AIKIT_UI

  singularity build aikit.sif aikit.def

  -or-

  apptainer build aikit.sif aikit.def


**Singularity AIKIT Rails interface example:**

  Place LLM models in io/hub

  singularity run --nv -B io/:/io/ aikit.sif "rails s -b 0.0.0.0"

  -or-

  apptainer run --nv -B io/:/io/ aikit.sif "rails s -b 0.0.0.0"
  
  
  AIKIT web interface on port 3000 on hosting server


**Docker**

**To build:**

  docker build . -t aikit:latest 

**To run:**

  Place LLM models in io/hub

  ./docker_up.cmds

  AIKIT web interface on port 3000 on hosting server
